package com.ibm.springboot.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("employee")
public class Employee {

	@Id
	private String employeeId;
	private String name;
	private Double salary;
	private String email;
	private Long aadhaar;
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Employee(String employeeId, String name, Double salary, String email, Long aadhaar) {
		super();
		this.employeeId = employeeId;
		this.name = name;
		this.salary = salary;
		this.email = email;
		this.aadhaar = aadhaar;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getAadhaar() {
		return aadhaar;
	}
	public void setAadhaar(Long aadhaar) {
		this.aadhaar = aadhaar;
	}
	@Override
	public String toString() {
		return "Employee [employeeId=" + employeeId + ", name=" + name + ", salary=" + salary + ", email="
				+ email + ", aadhaar=" + aadhaar + "]";
	}
	
}
