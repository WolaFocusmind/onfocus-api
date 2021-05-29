"use sctrict";

const express = require("express").Router;

const app = express();
const {
  Tokens: { user },
} = require("../services");
const { validations: { validator, schemas: { sessions, forms, categories } } } = require("../middlewares");

// ---------------- Routes Controllers ---------------------------------------- //

const {
  course, category, emails, auth, student, teacher, trash, entities, payments,
} = require("../middlewares/controllers");

// ---------------- Courses ---------------------------------------- //

app.post("/course", course.create);
app.put("/course/:id", course.update);
app.get("/course/:slug", course.bySlug);
app.post("/me/course/buy", course.buy);
app.get("/admin/course", course.adminAll);
app.get("/course", course.all);
app.get("/course/get/:id", course.getOneById);
app.get("/me/course", user.userToken, course.getMeAll);
app.get("/me/course/:slug", user.userToken, course.getMeBySlug);
app.get("/me/course/:slug/modules", user.userToken, course.getModules);
app.post("/me/progress/course/:id", user.userToken, course.updateProgess);

// ---------------- Category ---------------------------------------- //

app.post("/category", validator.body(categories.category), category.create);
app.put("/category/:id", category.update);
app.put("/category/courses/delete", category.deleteCoursesFrom);
app.put("/category/courses/add", category.add);
app.get("/category/:slug", category.bySlug);
app.get("/category", category.all);

// ---------------- Students ---------------------------------------- //

app.post("/student", student.create);
app.get("/activation/:code", student.activate);
app.put("/student/:id", student.update);
app.get("/student/:id", student.findbyId);
app.get("/student", student.all);

// ---------------- Teachers ---------------------------------------- //

app.post("/teacher", teacher.create);
app.put("/teacher/:id", teacher.update);
app.put("/teacher/courses/delete", teacher.deleteCoursesFrom);
app.put("/teacher/courses/add", teacher.add);
app.get("/teacher/:id", teacher.findById);
app.get("/teacher", teacher.all);

// ---------------- Trash ---------------------------------------- //

app.get("/trash", trash.all);
app.delete("/trash/:id", trash.deleteById);
app.put("/trash/:id", trash.restoreById);
app.post("/trash", trash.sendTo);

// ---------------- Sessions ---------------------------------------- //

app.post("/login", validator.body(sessions.login), auth.loginUser);
app.get("/logout", auth.logoutUser);
app.post("/me/password", user.userToken, validator.body(sessions.changePassword), auth.changeUserPassword);

// ---------------- Contact ---------------------------------------- //

app.post("/contact", validator.body(forms.contactForm), emails.contact);
app.post("/contactEvent", emails.contactEvent);

// ---------------- Entities ---------------------------------------- //

app.get("/all/:entity", entities.all);
app.put("/update/:entity/:id", entities.updateStatus);

// ---------------- Payments ---------------------------------------- //

app.post("/payment/mercadopago/webhook", payments.mercadopago);
app.post("/payment/stripe/webhook", payments.stripe);
app.post("/payment/paypal/webhook", payments.paypal);
app.get("/payment/paypal/process", payments.paypalProcess);

app.get("/event", entities.events);

module.exports = app;
