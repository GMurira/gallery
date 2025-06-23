pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
    }

    environment {
        MONGO_URI = credentials('mongo_uri')  // Set up in Jenkins credentials
        RENDER_DEPLOY_HOOK = credentials('render_deploy_hook') // Render deploy webhook URL
        RENDER_URL = 'https://your-render-app.onrender.com'  // Replace with actual Render site URL
        SLACK_WEBHOOK = credentials('slack_webhook') // Slack Incoming Webhook URL
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/GMurira/gallery'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    echo 'Tests failed.'
                    emailext(
                        subject: "Jenkins Build #${env.BUILD_NUMBER} Failed",
                        body: "Build failed during tests. See Jenkins for details.",
                        to: 'your-email@example.com'
                    )
                    error('Stopping pipeline due to test failure.')
                }
                success {
                    echo 'Tests passed.'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Triggering deployment to Render...'
                sh "curl -X POST ${RENDER_DEPLOY_HOOK}"
            }
        }
    }

    post {
        success {
            echo 'Build and deploy successful.'
            sh '''
                curl -X POST -H 'Content-type: application/json' \
                --data "{
                    \"text\": \" Build #${BUILD_NUMBER} deployed successfully! View it at ${RENDER_URL}\"
                }" ${SLACK_WEBHOOK}
            '''
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}
