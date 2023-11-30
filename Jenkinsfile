pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                script {
                    echo 'Testing frontend....'
                    sh 'npm run test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    echo 'Building frontend...'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deployment steps here
            }
        }
    }
}
