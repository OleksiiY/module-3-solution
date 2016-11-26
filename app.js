(function() {
  'use strict'

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItems);


NarrowItDownController.$inject=['MenuSearchService'];

function foundItems(){
  var ddo={
      templateUrl:"found-items.html",
      scope:{
        found:'<',
        onRemove:'&'
      },
      controller: MenuListDirectiveController,
      controllerAs: 'list',
      bindToController: true

  }
  return ddo;
};

function NarrowItDownController(MenuSearchService){
  var menu=this;
  menu.foundArray=[];
  menu.searchElem="";

menu.findItem=function(){
  var promise=MenuSearchService.getMatchedMenuItems(menu.searchElem);
    promise.then(function(response){
      menu.found=response;
    })
menu.searchElem="";

};

menu.remove=function(index){
  menu.found.splice(index,1);
}


};

MenuSearchService.$inject=['$http'];
function MenuSearchService($http){
  var service=this;
  var found=[];

/*Поиск массива */
  service.getMatchedMenuItems=function(searchTerm){
    return $http({
      method:'GET',
      url:'https://davids-restaurant.herokuapp.com/menu_items.json'
    }).
    then(function(response){
      var menu=response.data;
      var i;
        for(i=0;i<menu.menu_items.length;i++){
          if ((menu.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) && (searchTerm!==null) && (searchTerm!=="")){
            found.push(menu.menu_items[i]);
          }}
      return found;
      }).catch(function(error){
        console.log("Something went terribly wrong.");
      });
  };




};


function MenuListDirectiveController(){

}


}());
