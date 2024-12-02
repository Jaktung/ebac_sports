import { useGetProductsQuery } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../store'

import * as S from './styles'

import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { favoritar } from '../store/reducers/carrinho'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProductsQuery()
  const favoritos = useSelector(
    (state: RootReducer) => state.carrinho.favoritos
  )
  const dispatch = useDispatch()

  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((favorito) => favorito.id === produto.id)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(favoritar(produto))
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={handleFavoritar}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
