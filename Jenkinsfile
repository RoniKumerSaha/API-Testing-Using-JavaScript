pipeline {
    
    stages {
        stage('Clone repo'){
            checkout scm
        }
        stage('Build Image') {
            steps {
                sh 'export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$PATH'
                sh 'docker build -t apitest .'
            }
        }
        stage('Run Image/Tests') {
            steps {
                sh 'export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$PATH'
                sh 'docker run apitest'
            }
        }
    }
}