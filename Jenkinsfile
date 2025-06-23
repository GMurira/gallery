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
            post {
                success {
                    slackSend(
                        channel: '#geoffrey_ip1',
                        color: 'good',
                        message: "Deployment Successful! Build #${env.BUILD_NUMBER} deployed: https://gallery-2off.onrender.com",
                        teamDomain: 'Murira',
                        tokenCredentialId: 'slacktoken',
                        botUser: true
                    )
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deploy successful.'
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}
//