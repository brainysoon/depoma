pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'walle/jenkins/build.sh'
                sh 'mo/jenkins/build.sh'
            }
        }
        stage('Test') {
            steps {
                sh 'walle/jenkins/test.sh'
                sh 'mo/jenkins/test.sh'
            }
        }
        stage('Deploy') {
            steps {
                sh 'walle/jenkins/deploy.sh'
                sh 'mo/jenkins/deploy.sh'
            }
        }
    }
}