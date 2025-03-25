import { UserService } from './services/user.service'

async function main() {
  const userService = new UserService()
  const users = await userService.listUsers()
  console.log(users)
  const newUser = await userService.createUser({
    email: 'john@example.com',
    name: 'John Doe'
  })
  console.log(newUser)
}

main().catch(console.error)