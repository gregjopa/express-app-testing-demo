pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run unit and integration test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Run e2e test') {
      steps {
        sh 'npm run test:e2e'
      }
    }

    stage('Export test result') {
      steps {
        junit(testResults: 'test_reults/*.xml', allowEmptyResults: true)
        junit(testResults: 'build/reports/**/*.xml', allowEmptyResults: true)
        junit 'build/reports/**/test_results/*.xml'
      }
    }

    stage('Deploy to heroku') {
      steps {
        sh 'cd'
      }
    }

  }
}