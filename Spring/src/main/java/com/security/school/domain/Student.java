package com.security.school.domain;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.validation.constraints.NotNull;
import java.util.Set;

@Builder
@Entity
@Data
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull(message = "Please enter a First Name")
    private String firstName;
    @NotNull(message = "Please enter a Last Name")
    private String lastName;
    @NotNull(message = "Please enter a homeCity for the student")
    private String homeCity;
    @NotNull(message = "Please the student status")
    private StudentStatus status;



    public  Student(){}

    public Student(String firstName, String lastName, String homeCity, StudentStatus status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.homeCity = homeCity;
        this.status = status;
    }
}
