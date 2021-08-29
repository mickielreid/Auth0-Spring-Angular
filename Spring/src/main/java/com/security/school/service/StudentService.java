package com.security.school.service;

import com.security.school.domain.Student;
import com.security.school.domain.StudentStatus;
import com.security.school.repo.StudentRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;

    public StudentService() {

    }

    public  ResponseEntity<?> getAll(){
        log.info("Getting All  Student");
        List<Student> allStudents = studentRepo.findAll();


        if(allStudents.size() == 0){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Could not find any Student");
        }

        return ResponseEntity.ok().body(allStudents);

    }

    public ResponseEntity<?> getStudentsByName(String name) {
        List<Student> allByFirstName = studentRepo.findAllByFirstName(name);

        if(allByFirstName.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Could not find any student by the name of " + name);
        }

        return ResponseEntity.ok().body(allByFirstName);


    }

    public ResponseEntity<?> getStudentById(Long id) {

        Optional<Student> studentbyId= studentRepo.findById(id);

        if(!studentbyId.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Could not find any student for the specfied id ");
        }

        return ResponseEntity.ok().body(studentbyId);
    }

    public ResponseEntity<?> deleteStudent(Long id) {
        log.info("Deleting Student " + id);

        studentRepo.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public ResponseEntity<?> createStudent2(Student student) {
        log.info("Creating Student");
        Student dummyStudent =  Student.builder()
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .homeCity(student.getHomeCity())
                .status(student.getStatus())
                .build();


        Student saved = studentRepo.save(dummyStudent);

        if(saved.getId() == null  ){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not save the student");
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> updateStudent(Student student) {
        log.info("Updating  Student " + student.getId().toString());
        Optional<Student> savedStudent = studentRepo.findById(student.getId());

        if(!savedStudent.isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Student Does not exist");
        }

//        this is the extracted student
        Student _student = savedStudent.get();

        _student.setFirstName(student.getFirstName());
        _student.setLastName(student.getLastName());
        _student.setHomeCity(student.getHomeCity());
        _student.setStatus(student.getStatus());

        studentRepo.save(_student);

        return ResponseEntity.ok().build();




    }


}
