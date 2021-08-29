package com.security.school.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Entity;


public enum StudentStatus {
//    converts it from string to the enum when serialization/deserialization
    @JsonProperty("active")
    ACTIVE,
    @JsonProperty("suspended")
    SUSPENDED,
    @JsonProperty("expelled")
    EXPELLED,
    @JsonProperty("graduated")
    GRADUATED
}
