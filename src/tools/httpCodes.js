module.exports = Object.freeze({
  CREATED: { code: 201, message: "Created Successfully!" },
  CREATE_ERROR: { code: 400, message: "Not created!" },

  UPDATED: { code: 200, message: "Updated Successfully!" },
  UPDATE_ERROR: { code: 400, message: "Not updated!" },

  LOGIN: { code: 205, message: "Login Successfully!" },
  LOGIN_ERROR: { code: 405, message: "Login error!" },

  LOGOUT: { code: 206, message: "Logout Successfully!" },
  LOGOUT_ERROR: { code: 406, message: "Logout error!" },

  SENT: { code: 202, message: "Message sent Successfully!" },
  SENT_ERROR: { code: 402, message: "Message not sent!" },

  DELETED: { code: 200, message: "Deleted Successfully!" },
  DELETED_ERROR: { code: 400, message: "Not deleted!" },

  RESTORED: { code: 200, message: "Restored Successfully!" },
  RESTORED_ERROR: { code: 400, message: "Not restored!" },

  NO_DATA: { code: 404, message: "No data to display" },
  NOT_FOUND: { code: 404, message: "Not found" },

  CHECK_PASSWORD: { code: 410, message: "Please check your password" },
  UPDATED_PASSWORD: { code: 210, message: "Password updated" },

  DUPLICATED_ERROR: { code: 220, message: "Course Already Purchased. Please check." },

});
