pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  tools {
    nodejs 'NodeJS 18'
  }

  stages {
    stage('Clone Repo') {
      steps {
        echo 'Cloning repository...'
        git url: 'https://github.com/SaiThrivedh/Blog.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        echo 'Running build script (if exists)...'
        sh 'npm run build || echo "No build script defined"'
      }
    }

    stage('Lint') {
      steps {
        echo 'Running linter (if exists)...'
        sh 'npm run lint || echo "No lint script defined"'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests (if exists)...'
        sh 'npm test || echo "No test script defined"'
      }
    }

    stage('Archive Artifacts') {
      when {
        expression { fileExists('build') }
      }
      steps {
        echo 'Archiving build artifacts...'
        archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
      }
    }
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
