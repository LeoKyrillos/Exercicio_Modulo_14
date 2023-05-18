/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() =>{
          cy.token('fulano@qa.com', 'teste').then(tkn => {token = tkn})
     })

     it('Deve validar contrato de usuários', () => {
          
          cy.request('usuarios').then(response => {
                return contrato.validateAsync(response.body)
           })
     });

     it('Deve listar usuários cadastrados', () => {
          
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[1].nome).to.equal('Fulano da Silva')
               expect(response.status).to.equal(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {

          let email = `${Math.floor(Math.random() * 10000000)}@gmail.com`
          let nome = `Carlos José${Math.floor(Math.random() * 10000000)}`
          
          cy.request({
                method: 'POST',
                url: 'usuarios',
                body: {
                     "nome": nome, //nome dinamico
                     "email": email, //email dinamico
                     "password": "teste1",
                     "administrador": "true"
                }
           }).then((response) =>{
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')

           })
     });


     it('Deve validar um usuário com email inválido', () => {
          
          cy.request({
                method: 'POST',
                url: 'usuarios',
                body: {
                     "nome": "José Carlos",
                     "email": "jcarlos.com.br",
                     "password": "teste1",
                     "administrador": "true"
                },
                failOnStatusCode: false

           }).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.email).to.equal('email deve ser um email válido')

          })           
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          
          let email = `${Math.floor(Math.random() * 10000000)}@gmail.com`

          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[5]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                         "nome": "Manoel Alterado",
                         "email": email, //email dinamico
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso")
               })
          })
     });

     it('Deve EDITAR um usuário já cadastrado com comando customizado', () => {

          let email = `xandom${Math.floor(Math.random() * 10000000)}@gmail.com`
          let password = `${Math.floor(Math.random() * 10000000)}`
          let administrador = 'true'

          cy.cadastrarUsuario("Xando Maranhão", email, password, administrador)
          .then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })

          .then(response => {
               let id = response.body._id
               cy.request({
                   method: 'PUT',
                   url: `usuarios/${id}`,
                   body:
                   {
                       "nome": "Carlos Porto",
                       "email": email,
                       "password": password,
                       "administrador": administrador
                   }
               }).then(response => {
                   expect(response.status).to.equal(200)
                   expect(response.body.message).to.equal("Registro alterado com sucesso")
               })
           })

          
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[5]._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,
                    
               }).then(response => {
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
               })
          }) 
     });

     it.only('Deve DELETAR usuário já cadastrado com comando customizado', () => {

          let email = `xandom${Math.floor(Math.random() * 10000000)}@gmail.com`
          let password = `${Math.floor(Math.random() * 10000000)}`
          let administrador = 'true'

          cy.cadastrarUsuario("Xando Maranhão", email, password, administrador)
          .then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            })
            .then(response=>{
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,
                    
                }).then(response =>{
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
                })
            })
          
     });
});