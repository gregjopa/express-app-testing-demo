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
        junit(testResults: 'test_results/*.xml', allowEmptyResults: true)
      }
    }

    stage('Deploy to heroku') {
      steps {
        emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
      }
    }
    
    stage('Publish Code Coverage') {
      steps {
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage', reportFiles: 'coverage/lcov-report/index.html', reportName: 'Coverage Report', reportTitles: ''])
      }
    }

  }
}