from bibliotecas_rag import *

tempo_atual = time.localtime()
hora_atual = tempo_atual.tm_hour
min_atual = tempo_atual.tm_min

#print(f'{hora_atual}:{min_atual}')

def gerar_saudacao(hora):
    if hora_atual >= 6 and hora_atual < 12:
        return 'Bom dia'

    elif hora_atual >= 12 and hora_atual < 18:
        return 'Boa tarde'

    return 'Boa noite'

saudacao = f'{gerar_saudacao(hora_atual)}, em que posso ajuda-lo(a)? '