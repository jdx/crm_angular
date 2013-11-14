function CustomerCtrl($scope, $http) {
  $http.get("http://rails-table-editor.dev/api/customers.json").success(function(customers) {
    $scope.customers = customers;
  });

  $scope.create = function() {
    $http.post("http://rails-table-editor.dev/api/customers.json", $scope.customer);
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
    $http.put("http://rails-table-editor.dev/api/customers/" + customer.id + ".json", customer.edit);
    customer.name = customer.edit.name;
    customer.phone = customer.edit.phone;
    customer.state = 'show';
  };
}
