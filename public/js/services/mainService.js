angular.module('app').service('mainService', function($http){
  this.test = "Controller and Service are working";

  let baseurl = 'localhost:3000/';

  this.getAllProjects = (userId) => {
  	return $http({
  		method: 'GET',
  		url: baseurl + 'api/projects/' + userId
  	}).then((response) => {
  		return response.data;
  	});
  }

  this.createProject = (projectData) => {
  	return $http({
  		method: 'POST',
  		url: baseurl + 'api/projects',
  		data: projectData
  	}).then((response) => {
  		return response;
  	});
  }

  this.updateProject = (newData) => {
  	return $http({
  		method: 'PUT',
  		url: baseurl + 'api/project/',
  		data: newData
  	}).then((response) => {
  		return response.data;
  	});
  }

  this.deleteProject = (projectId) => {
  	return $http({
  		method: 'DELETE',
  		url: baseurl + 'api/projects/' + projectId
  	}).then((response) => {
  		return response;
  	});
  }

});