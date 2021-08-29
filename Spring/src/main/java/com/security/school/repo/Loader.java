package com.security.school.repo;

import com.security.school.domain.Student;
import com.security.school.domain.StudentStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class Loader {

    @Autowired
    StudentRepo studentRepo;


    @Bean
    CommandLineRunner Dbloader(){
        return args -> {
//            saving random student status
            studentRepo.save(new Student("Jake", "Ruby", "Toronto", StudentStatus.ACTIVE));
            studentRepo.save(new Student("Michael", "Reid", "Toronto", StudentStatus.GRADUATED));
            studentRepo.save(new Student("Tara", "Reid", "New Jersey", StudentStatus.ACTIVE));
            studentRepo.save(new Student("Jessicka", "Dupont", "California", StudentStatus.SUSPENDED));
            studentRepo.save(new Student("Elizabeth ", "Holmes", " Washington", StudentStatus.EXPELLED));



        };
    };
}
