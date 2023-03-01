import Botao from "../Botao"
import Relogio from "./Relogio"
import style from "./Cronometro.module.scss"
import { TempoParaSegundos } from '../../common/utils/time'
import { ITarefa } from "../../types/tarefa"
import React, { useEffect, useState } from 'react';

interface Props {
  selecionado: ITarefa | undefined
  finalizaTarefa: () => void
}

export default function Cronometro({ selecionado, finalizaTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if (selecionado?.tempo) {
      setTempo(TempoParaSegundos(selecionado.tempo))
    }
  }, [selecionado])

  function Regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1);
        return Regressiva(contador - 1);
      }
      finalizaTarefa();
    }, 1000)
  }

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo} />
      </div>
      <Botao onClick={() => Regressiva(tempo)}>
        Começar!
      </Botao>
    </div>
  )
}