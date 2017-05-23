angular.module('app').controller('mainCtrl', function($scope, mainService){

	function getUser() {
		console.log('getUser function ran!')
    mainService.getUser().then((user) => {
      if(user){
      	$scope.currentUser = user;
      	$scope.isLoggedIn = true;
      	let userId = user.id;

      	$scope.getProjects = () => {
					mainService.getAllProjects(userId).then((response) => {
						$scope.projects = response;
					});
				}
				$scope.getProjects();

				$scope.newProject = (projectData) => {
					projectData.user_id = userId;
					mainService.createProject(projectData).then((response) => {
						$scope.newPro = response;
					});
				}

				$scope.updateProject = () => {
					mainService.updateProject(newData).then((response) => {
						$scope.updated = response;
					});
				}

				$scope.deleteProject = (projectId) => {
					mainService.deleteProject(projectId).then((response) => {
						$scope.deleted = response;
					});
				}
      	
      }
    });
  }

  $scope.callUser = getUser();

  $scope.logout = mainService.logout;

});