package com.security.school.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Slf4j
@EnableWebSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter {

//  getting the values from application properties
    @Value("${auth0.audience}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;


//    role-- student-admin can create update and delete and create accounts of all types
//    role  -- student-user can only view  and create

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        that space is required because i added the permission badly
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST,"/api/v1/student").hasAuthority("create:student")
                .antMatchers(HttpMethod.PATCH,"/api/v1/student").hasAuthority("update:student ")//note the extra space
                .antMatchers(HttpMethod.DELETE,"/api/v1/student").hasAuthority("delete:student")
                .antMatchers(HttpMethod.GET, "/api/v1/student").hasAuthority("read:student")
                .anyRequest()
                .authenticated()
                .and()
                .cors()
                .configurationSource(corsConfigurationSource())
                .and()
                .oauth2ResourceServer()
                .jwt()
                .decoder(jwtDecoder())
                .jwtAuthenticationConverter(jwtAuthenticationConverter())


//                .decoder(jwtDecoder())
        ;

    }

    //    to enable CROS
//    this is for the entire application
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
//        http://localhost:8080/

        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200" ,"http://localhost:8080", "http://localhost:8080/", "http://localhost:4200/"));

        configuration.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.PATCH.name(),
                HttpMethod.POST.name(),
                HttpMethod.DELETE.name()
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration.applyPermitDefaultValues());
        return source;
    }


    JwtDecoder jwtDecoder() {
//      the validator we just created
        OAuth2TokenValidator<Jwt> withAudience = new AudienceValidator(audience);

        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);

        OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(withAudience, withIssuer);

        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder) JwtDecoders.fromOidcIssuerLocation(issuer);
        jwtDecoder.setJwtValidator(validator);
        return jwtDecoder;
    }

    //    converts permission from auth0 to  granted autortities that spring understands
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        log.info("In the Jwt Converter");
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        //we arw looking for the authorities in permissions
        converter.setAuthoritiesClaimName("permissions");
        converter.setAuthorityPrefix("");



        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);



        return jwtConverter;
    }
}
