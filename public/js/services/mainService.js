angular.module('app').service('mainService', function($http){

  // let baseurl = 'http://138.68.244.21:5025';

  this.getAllProjects = (userId) => {
  	return $http({
  		method: 'GET',
  		url:'/api/projects/' + userId
  	}).then((response) => {
  		return response.data;
  	});
  }

  this.createProject = (projectData) => {
  	return $http({
  		method: 'POST',
  		url:'/api/projects',
  		data: projectData
  	}).then((response) => {
  		return response;
  	});
  }

  this.updateProject = (newData) => {
  	return $http({
  		method: 'PUT',
  		url:'/api/project/',
  		data: newData
  	}).then((response) => {
      return response.data;
  	});
  }

  this.updateFav = (isFav) => {
    return $http({
      method: 'PUT',
      url:'/api/project/fav',
      data: isFav
    }).then((response) => {
      return response.data;
    });
  }

  this.deleteProject = (projectId) => {
  	return $http({
  		method: 'DELETE',
  		url:'/api/projects/' + projectId
  	}).then((response) => {
  		return response;
  	});
  }

  this.getUser = () => {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  }

  this.logout = () => {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
  }
});
