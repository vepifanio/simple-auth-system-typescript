import { randomUUID } from 'node:crypto'

export interface UserProps {
  email: string
  password: string
  createdAt?: Date
}

export class User {
  private _id: string
  private props: UserProps

  private constructor({ id, props }: { id: string; props: UserProps }) {
    this._id = id
    this.props = props
  }

  static create(props: UserProps, id?: string) {
    const user = new User({
      id: id || randomUUID(),
      props: {
        ...props,
        createdAt: props.createdAt || new Date(),
      },
    })

    return user
  }

  get id() {
    return this._id
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(newPassword: string) {
    this.props.password = newPassword
  }

  get createdAt() {
    return this.props.createdAt
  }
}
