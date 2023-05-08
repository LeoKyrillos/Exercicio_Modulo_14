/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() =>{
          cy.token('fulano@qa.com', 'teste').then(tkn => {token = tkn})
     })

     it('Deve validar contrato de usuários', () => {
          /*cy.request('/usuario').then(response => {
                return contrato.validateAsync(response.body)
           })*/
     });

     it('Deve listar usuários cadastrados-ok', () => {
          /*cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[0].nome).to.equal('Fulano da Silva')
               expect(response.status).to.equal(200)
          })*/
     });

     it.only('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
                method: 'POST',
                url: '/usuarios',
                bod: {
                     "nome": "José Carlos",
                     "email": "jcarlos@qa.com.br",
                     "password": "teste1",
                     "administrador": "true"
                }
           })
     });


     it('Deve validar um usuário com email inválido', () => {
           /*cy.request({
                method: 'POST',
                url: '/usuarios',
                bod: {
                     "nome": "José Carlos",
                     "email": "jcarlos.com.br",
                     "password": "teste1",
                     "administrador": "true"
                }
           }).then((response) => {
               expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
          })*/ 
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          //TODO: 
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          //TODO: 
     });



});