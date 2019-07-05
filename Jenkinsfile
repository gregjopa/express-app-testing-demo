pipeline {
	agent any 
	//This line search for nodejs tool named “node” and use it in pipeline. It’s necessary for next scripts find the commands.
	tools {nodejs "node"} 
		stages {
				stage('Build')
				{
				steps {
					echo 'Building..'
					sh 'npm install'
					sh 'npm config ls'
				}
				}
		}
}
