from bibliotecas_rag import *

try:
    load_dotenv()

    openai_api_key = os.getenv('OPENAI_API_KEY')

    if openai_api_key:
        print('Chave de API carregada com sucesso.')
    
    else:
        print('Chave de API não encontrada no arquivo .env.')

    client = OpenAI()

    #Diretorios dos PDFs
    diretorio = r'D:\Documentos Dev\Pratica Profisional\RAG\PDFs'

    def carregar_arquivos(caminho: str):
        documentos = []
        for nome_arquivo in os.listdir(caminho):
            caminho_arquivo = os.path.join(caminho, nome_arquivo)

            if nome_arquivo.endswith('.pdf'):
                loader = PyPDFLoader(caminho_arquivo)
            elif nome_arquivo.endswith('.txt'):
                loader = TextLoader(caminho_arquivo)
            else:
                continue

            try:
                documentos.extend(loader.load())

            except Exception as e:
                print(f'Erro ao carregar {nome_arquivo}: {e}')

        return documentos
    
    documentos = carregar_arquivos(diretorio)

    modelo_embedding = OpenAIEmbeddings(model = 'text-embedding-3-small')

    def gerar_vector_db(documentos):
        try:
            separador_textos = RecursiveCharacterTextSplitter(
                chunk_size = 500,
                chunk_overlap = 50,
                length_function = len
                )

            textos_separados = []
            for i, documento in enumerate(documentos):
                textos = separador_textos.split_documents([documento])
                textos_separados.extend(textos)

            vector_db = FAISS.from_documents(textos_separados, modelo_embedding)

            return vector_db

        except Exception as e:
            print(f'Erro ao gerar o vector db: {e}')
    
    #Diretorio para salvar ou carregar o vector_db
    diretorio_vector_db = r'D:\Documentos Dev\Pratica Profisional\RAG\vector_db'

    if os.path.exists(diretorio_vector_db):
        vector_db = FAISS.load_local(
        diretorio_vector_db,
        modelo_embedding,
        allow_dangerous_deserialization=True
    )
    else:
        vector_db = gerar_vector_db(documentos)
        vector_db.save_local(diretorio_vector_db)

    def gerar_retriever(vector_db, documentos):
        try:
            store = InMemoryStore()
            parent_splitter = RecursiveCharacterTextSplitter(chunk_size = 2000)
            child_splitter = RecursiveCharacterTextSplitter(chunk_size = 400)

            retriever = ParentDocumentRetriever(
                vectorstore = vector_db,
                docstore = store,
                parent_splitter = parent_splitter,
                child_splitter = child_splitter,
            )
            
            retriever.add_documents(documentos)

            return retriever

        except Exception as e:
            print(f'Erro ao criar retriever: {e}')

    retriever = gerar_retriever(vector_db, documentos)

    def gerar_resposta(pergunta, contexto):
        try:
            completion = client.chat.completions.create(
                model='gpt-4o-mini',
                temperature=0.0,
                messages=[
                    {'role': 'system', 'content': 'Você é uma assistente prestativo de ajuda. Use as seguintes partes do contexto para responder. Se você não souber a resposta. Diga que não sabe. Não invente uma.'},
                    {
                        'role': 'user',
                        'content': pergunta,
                    },
                    {
                        'role': 'user',
                        'content': f'contexto: {contexto}'
                    }
                ],
            )

            return completion.choices[0].message.content
    
        except Exception as e:
            return f'erro ao gerar resposta: {e}'

except Exception as e:
    print(f'Erro: {e}')