import React, { Component } from "react";
import Api from "../../services/api";
import Main from "../../components/Main/Main";
// import { Container } from './styles';
const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
  user: { userName: "", userEmail: "" },
  list: []
};

export default class UserCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    Api("/users").then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  load(user) {
    this.setState({ user });
  }

  async remove(user) {
    const resp = await Api.delete(`/users/${user.id}`);
    if (resp.data) {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    }
  }

  async save() {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const user_id = user.id ? `/users/${user.id}` : "/users";
    if (!user.id) {
      user.password = Math.random()
        .toString(36)
        .substring(2, 8);
      user.confirmPassword = user.password;
    }
    const resp = await Api[method](user_id, user);

    if (resp.data) {
      const list = this.getUpdatedList(resp.data[0]);
      this.setState({ list });
    }
    this.setState({ user: initialState.user });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col md-6">
            <div className="form group">
              <label>nome</label>
              <input
                type="text "
                name="userName"
                className="form-control"
                value={this.state.user.userName}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
          <div className="col-12 col md-6">
            <div className="form group">
              <label>E-mail</label>
              <input
                type="text "
                name="userEmail"
                className="form-control"
                value={this.state.user.userEmail}
                onChange={e => this.updateField(e)}
                placeholder="Digite o email..."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justfy-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secundary ml-2"
              onClick={e => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.userName}</td>
          <td>{user.userEmail}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => {
                this.load(user);
              }}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => {
                this.remove(user);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
