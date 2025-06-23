pipeline {
    agent any

    tools {
        nodejs 'nodejs' 
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
                    emailext(
                        subject: "Jenkins Build #${env.BUILD_NUMBER} Failed",
                        body: "Build failed during tests. Please check Jenkins logs for more details.",
                        to: 'geoffrey.murira@student.moringaschool.com'
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
                echo 'Deploy to render'
                sh "curl -X POST https://api.render.com/deploy/srv-d1c3remr433s7382lm6g?key=zCmG31MN5Do"
            }
        }
    }

    post {
        success {
            echo 'Build and deploy successful.'
            sh '''
                curl -X POST -H 'Content-type: application/json' \
                --data "{\"text\": \"Jenkins Build #${BUILD_NUMBER} deployed to https://gallery-2off.onrender.com\"}" your-slack-webhook-url
            '''
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}
