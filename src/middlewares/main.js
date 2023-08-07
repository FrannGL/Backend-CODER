export function checkLogin(req, res, next) {
  try {
    if (req.session.user.firstName) {
      return next();
    }
  } catch (e) {
    console.log(e);
    const isLogin = "Debes iniciar sesión para acceder a esta página";
    return res.status(201).render("error", { isLogin });
  }
}

export function checkAdmin(req, res, next) {
  if (req.session?.user?.role == "admin") {
    return next();
  } else {
    const isAdmin = "Debes ser administrador para acceder a esta página";
    return res.status(201).render("error", { isAdmin });
  }
}

export function checkUser(req, res, next) {
  if (req.session?.user?.role == "user") {
    return next();
  } else {
    const isAdmin = "Debes ser usuario para agregar productos al carrito";
    return res.status(201).render("error", { isAdmin });
  }
}
