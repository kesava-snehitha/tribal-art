# Stage 1: Build the React frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot backend
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
# Copy the built frontend to Spring Boot's static resources directory
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# Stage 3: Run the application
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend-build /app/backend/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Railway automatically provides the PORT environment variable
ENV PORT=8080
EXPOSE ${PORT}

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
