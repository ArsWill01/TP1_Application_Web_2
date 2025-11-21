FROM eclipse-temurin:22-jdk-jammy
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080 5005
#ENTRYPOINT ["java", "-jar","app.jar"]
ENTRYPOINT ["java", "-jar", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005","app.jar"]
