pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
    }
    
  }
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh 'npm install'
          }
        }
        stage('') {
          steps {
            sh 'npm run mocha'
          }
        }
      }
    }
    stage('') {
      steps {
        sh 'npm start'
      }
    }
  }
}