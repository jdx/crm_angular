var host;
if(/node/.test(window.location.href)) {
  var host = "http://crm-node.herokuapp.com"
  //var host = 'http://localhost:5000';
} else {
  var host = "http://crm-rails.herokuapp.com"
  //var host = "http://crm-rails.dev";
}

function CustomerCtrl($scope, $http) {
  $http.get(host + '/api/v1/customers.json').success(function(customers) {
    $scope.customers = customers;
  });

  $scope.create = function() {
    $http.post(host + "/api/v1/customers.json", $scope.customer);
    $scope.customers.push($scope.customer);
    $scope.customer = null;
  };

  $scope.edit = function(customer) {
    customer.state = 'editing';
    customer.edit = {
      name: customer.name,
      phone: customer.phone
    };
  };

  $scope.update = function(customer) {
    $http.put(host + "/api/v1/customers/" + customer.id + ".json", customer.edit);
    customer.name = customer.edit.name;
    customer.phone = customer.edit.phone;
    customer.state = 'show';
  };
}
