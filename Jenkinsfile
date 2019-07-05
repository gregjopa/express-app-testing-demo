pipeline {
	agent any 
	//This line search for nodejs tool named “node” and use it in pipeline. It’s necessary for next scripts find the commands.
	tools {nodejs "node"} 
		stages {
				

				stage('GIT Clone') {
				steps {
					git 'https://github.com/Ashwani00002/express-app-testing-demo.git'
				}
				}
				

				stage('Build')
				{
				steps {
					echo 'Building..'
				}
				}
				

				stage('Install Dependencies') {
				steps{
					sh 'npm install'
					sh 'npm config ls'
				}
				}
		}
}
