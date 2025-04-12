pipeline {
  agent any

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
        echo 'You can add build scripts here'
      }
    }

    stage('Test') {
      steps {
        echo 'Add test command like npm test here'
      }
    }
  }
}
