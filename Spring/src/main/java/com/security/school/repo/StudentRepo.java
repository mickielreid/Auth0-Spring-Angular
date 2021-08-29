package com.security.school.repo;

import com.security.school.domain.Student;
import com.security.school.domain.StudentStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends CrudRepository<Student, Long> {

//    StudentStatus findStudentByStudentStatus(StudentStatus status);
    List<Student> findAll();
    List<Student> findAllByFirstName(String firstName);
}
