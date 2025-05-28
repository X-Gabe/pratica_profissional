from bibliotecas_resposta import *

try:
    c = 0
    while True:
        if c == 0:
            print(f'Assitente: {saudacao}, em que posso ajuda-lo(a)? ')
            pergunta = input('Você: ')
            c += 1
        
        else:
            pergunta = input('Você: ')

        if pergunta.lower() in ['sair','tchau','encerrrar']:
            print(f'Assitente: Espero ter sido de ajuda, até a proxima.')
            break
        
        if pergunta == '':
            pergunta = input('Você: ')

        else:
            docs_contexto = retriever.invoke(pergunta)
            contexto = '\n'.join([doc.page_content for doc in docs_contexto])

            resposta = gerar_resposta(pergunta, contexto)
            print(f'Assitente: {resposta}')

except Exception as e:
    print(f'Error: {e}')