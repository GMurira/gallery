pipeline {
    agent any

    tools {
        nodejs 'nodejs' // Use the correct label defined in Jenkins Global Tool Configuration
    }

    environment {
        MONGO_URI = credentials('mongo_uri')  // Set this up in Jenkins credentials
        RENDER_DEPLOY_HOOK = credentials('render_deploy_hook') // Render deploy hook secret
        RENDER_URL = 'https://gallery-2off.onrender.com'  // Replace with your actual Render site URL
        SLACK_WEBHOOK = credentials('slack_webhook') // Slack webhook secret
    }

    triggers {
        githubPush() // Automatically trigger on push
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/GMurira/gallery.git'
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
                    emailext('geoffrey.murira@student.moringaschool.com'
                    )
                    error('Tests did not pass.')
                }
                success {
                    echo 'Tests passed.'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo '🚀 Triggering Render deployment...'
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
                    \"text\": \"Jenkins Build #${BUILD_NUMBER} deployed to ${RENDER_URL}\" 
                }" ${SLACK_WEBHOOK}
            '''
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}
