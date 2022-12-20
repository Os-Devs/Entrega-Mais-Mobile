import { Ionicons as Icon } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';

import Button from '../../componentes/Button';
import Container from '../../componentes/Container';
import { Column, HeaderText, Input, Row, Separator, Text } from '../../styled';
import axios from "axios";

export default function CadastroTrajetoStep1({ navigation, route }: any) {
	const [nmtrajeto, setNmTrajeto] = useState('');
	const [dstrajeto, setDsTrajeto] = useState('');
	const [idtransportadora, setIdTransportadora] = useState('');

	useEffect(() => {
		console.log(route.params?.email)
		axios.get(`http://192.168.0.102:7730/api/transportadora/transportadoraPorEmail/${route.params?.email}`
        ).then(res => {
            console.log(res.data.id);
			setIdTransportadora(res.data.id);
        }).catch((error) => {
			console.log(error); 
		})
    }, []);


	const salvarTrajeto = () => {

		const body = {
			nmtrajeto: nmtrajeto,
			dstrajeto: dstrajeto,
			idtransportadora: idtransportadora,
		}

		axios.post('http://192.168.0.102:3000/trajetos', body)
			.then(res => {
				console.log(body);
				const titulo = (res.data.status) ? "Erro" : "Sucesso";
				Alert.alert(titulo, "Cadastro realizado com sucesso!", [ {
					text: "OK", onPress: () => {navigation.navigate('CadastroCidadeStep1',{
						nmtrajeto: nmtrajeto,
						dstrajeto: dstrajeto,
						idtransportadora: idtransportadora
					} )}
				}]);
				console.log(res.data);
			})
			.catch((error) => {
				Alert.alert("Erro", "Erro ao tentar cadastrar trajeto");
				console.log(error);
			});
	}

	return (
		<Container>
			<KeyboardAvoidingView>
				<Row>
					<Column alignItensCenter>
						<Row justifyContentCenter>
							<Icon
								name={'caret-down-circle'}
								size={15}
								color="#FFF"
							/>
							<Separator />
							<Icon
								name={'radio-button-off-outline'}
								size={15}
								color="#dedede"
							/>
						</Row>

						<HeaderText>Trajeto</HeaderText>

						<Input
							value={nmtrajeto}
							placeholder="Nome do Trajeto"
							placeholderTextColor={'white'}
							autoCorrect={false}
							onChangeText={(text: string) => {setNmTrajeto(text)}}
						/>
						<Input
							value={dstrajeto}
							placeholder="Descrição do Trajeto"
							placeholderTextColor={'white'}
							autoCorrect={false}
							onChangeText={(text: string) => {setDsTrajeto(text)}}
						/>
						{/* <Input
							value={idtransportadora}
							placeholder="Codigo da Transportadora"
							placeholderTextColor={'white'}
							autoCorrect={false}
							onChangeText={(text: string) => {setIdTransportadora(text)}}
						/> */}

						<Button
							isPrimary
							buttonSize={'large'}
							labelSize={'medium'}
							onPress={() => { 
								salvarTrajeto();
							}}
						>
							Prosseguir
						</Button>
					</Column>
				</Row>
			</KeyboardAvoidingView>
		</Container>
	);
}
