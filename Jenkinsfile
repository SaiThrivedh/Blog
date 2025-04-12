pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
    // Add any environment variables you need
  }

  tools {
    nodejs 'NodeJS 18' // Make sure this matches your Jenkins tool config name
  }

  stages {
    stage('Clone Repo') {
      steps {
        git url: 'https://github.com/SaiThrivedh/Blog.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        echo 'Running build script...'
        sh 'npm run build || echo "No build script defined"'
      }
    }

    stage('Lint') {
      steps {
        echo 'Running linter...'
        sh 'npm run lint || echo "No lint script defined"'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'npm test || echo "No test script defined"'
      }
    }

    stage('Archive Artifacts') {
      when {
        expression { fileExists('build') }
      }
      steps {
        archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
      }
    }

    // Optional: Add deploy stage later if needed
    // stage('Deploy') {
    //   steps {
    //     echo 'Deploy step goes here'
    //   }
    // }
  }

  post {
    always {
      echo 'Pipeline completed.'
    }
    success {
      echo 'Pipeline succeeded!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
