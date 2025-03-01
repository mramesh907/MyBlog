import React from "react"
import { Container, Logo, Logout } from "../index.js"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Register", path: "/register", active: !authStatus },
    { name: "All Posts", path: "/all-posts", active: authStatus },
    { name: "Create Post", path: "/create-post", active: authStatus },
  ]

  return (
    <header className="bg-gray-800 py-4">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <nav>
            <ul className="flex space-x-4">
              {navItems
                .filter((item) => item.active) // ✅ Only render active links
                .map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-white hover:text-gray-300 font-bold"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

              {/* ✅ Logout button outside of map */}
              {authStatus && (
                <li>
                  <Logout />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header
