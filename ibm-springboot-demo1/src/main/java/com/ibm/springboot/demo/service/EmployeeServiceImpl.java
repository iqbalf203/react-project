package com.ibm.springboot.demo.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.ibm.springboot.demo.exception.EmployeeNotFoundException;
import com.ibm.springboot.demo.model.Employee;
import com.ibm.springboot.demo.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	
	private final Logger LOG = LoggerFactory.getLogger(this.getClass());

	@Autowired
	EmployeeRepository employeeRepository;
	
	@Override
	public Page<Employee> getEmployeePages(Integer page, Integer size, String sortBy) {
		PageRequest pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return employeeRepository.findAll(pageable);
	}

	@Override
	public List<Employee> getAllEmployees() {
		LOG.info("getAllEmployees");
		// what if the collection is empty ?
		return employeeRepository.findAll();
	}

	@Override
	public Employee getEmployeeById(String employeeId) {
		Optional<Employee> empOptional = employeeRepository.findById(employeeId);
		if (empOptional.isEmpty()) {
			String errorMessage = "Employee with the id " + employeeId + " is not found!";
			LOG.warn(errorMessage);
			throw new EmployeeNotFoundException(errorMessage);
		} else
			return empOptional.get();
	}

	@Override
	public List<Employee> getEmployeeByFirstName(String name) {
		LOG.info(name);
		List<Employee> empList = employeeRepository.findByName(name);
		if (empList.isEmpty()) {
			String errorMessage = "Employee with firstName " + name + " is not found!";
			LOG.warn(errorMessage);
			throw new EmployeeNotFoundException(errorMessage);
		}
		return empList;
	}

	@Override
	public Employee addEmployee(Employee employee) {
		// any better code is needed? 
		LOG.info(employee.toString());
		return employeeRepository.save(employee);
	}

	@Override
	public Employee deleteEmployee(String employeeId) {
		LOG.info(employeeId);
		Employee empToBeDeleted = this.getEmployeeById(employeeId);
		employeeRepository.deleteById(employeeId);
		return empToBeDeleted;
	}

	@Override
	public Employee updateEmployee(String empId, Employee employee) {
		Employee emp = getEmployeeById(empId);
		if (employee.getName() != null)
			emp.setName(employee.getName());

		if (employee.getSalary() != null)
			emp.setSalary(employee.getSalary());
		
		if (employee.getEmail() != null)
			emp.setEmail(employee.getEmail());
		
		return employeeRepository.save(emp);
	}

}

