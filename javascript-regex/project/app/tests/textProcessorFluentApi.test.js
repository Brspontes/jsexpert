const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('./../src/textProcessorFluentApi')
const mock = require('./mock/valid')

describe('TextProcessorApi', () => {
  it('#build', () => {
    const result = new TextProcessorFluentAPI(mock).build()
    expect(result).to.be.deep.equal(mock)
  })
  it('#extractPeopleData', () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build()

    const expected = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
      ].join('\n'),
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ',
      ].join('\n'),
    ]

    expect(result).to.be.deep.equal(expected)
  })
  it('#divideTextInColumns', () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
      ].join('\n'),
    ]
    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build()
    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. ',
      ],
    ]
    expect(result).to.be.deep.equal(expected)
  })
  it('#removeEmptyCharacters', () => {
    const content = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. ',
      ],
    ]

    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build()

    const expected = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        '235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.',
      ],
    ]
    expect(result).to.be.deep.equal(expected)
  })
})