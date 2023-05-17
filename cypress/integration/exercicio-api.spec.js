/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() =>{
          cy.token('fulano@qa.com', 'teste').then(tkn => {token = tkn})
     })

     it('Deve validar contrato de usuários', () => {
          //Teste Passa
          cy.request('usuarios').then(response => {
                return contrato.validateAsync(response.body)
           })
     });

     it('Deve listar usuários cadastrados', () => {
          //Teste Passa
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[1].nome).to.equal('Fulano da Silva')
               expect(response.status).to.equal(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          //Teste Passa *trocar numero no corpo do email
          cy.request({
                method: 'POST',
                url: 'usuarios',
                body: {
                     "nome": "José Carlos", //tornar nome dinamico
                     "email": "jcarlos@qa8.com.br", //tornar email dinamico
                     "password": "teste1",
                     "administrador": "true"
                }
           }).then((response) =>{
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')

           })
     });


     it('Deve validar um usuário com email inválido', () => {
          //Teste Passa
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
          //Teste Passa
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[5]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                         "nome": "Manoel Alterado",
                         "email": "manoelalterado@qa2.com.br", //tornar email dinamico
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso")
               })
          })
     });

     it.only('Deve deletar um usuário previamente cadastrado', () => {
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



});