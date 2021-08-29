package com.security.school.controller;

import com.security.school.domain.Student;
import com.security.school.repo.StudentRepo;
import com.security.school.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/student")
@Slf4j
public class StudentController {

    @Autowired
    StudentRepo studentRepo;
    
    @Autowired
    StudentService service;

    public StudentController(){

    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> getAllStudents(){

        return service.getAll();
    }

//    **student?name=looper
    @CrossOrigin
    @GetMapping("getbyname/{name}")
    public ResponseEntity<?> getStudentsByName(@PathVariable(required = true) String name){
        return service.getStudentsByName(name);
    }

//    **student?id=23
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable(required = true) Long id){
        return service.getStudentById(id);
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student){
        return service.createStudent2(student);
    }

    @PatchMapping
    public ResponseEntity<?> updateStudent(@RequestBody Student student){
        return service.updateStudent(student);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteStudent(@RequestParam(required = true) Long id){
        return service.deleteStudent(id);
    }
}
