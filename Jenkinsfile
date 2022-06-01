node:alpine{
    def app
    stage('Clone Repo'){
        checkout scm
    }
    stage('Build image'){
        steps {
        sh 'export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$PATH'
        sh 'docker build -t apitest .'
      }
    }
    stage('Run Tests'){
        steps {
        sh 'export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$PATH'
        sh 'docker run apitest'
      }
    }
    
}