# Dados que exigem preenchimento manual (limitações da Jolpica)

Este documento lista os campos e entidades que a API da Jolpica não fornece,
exigindo curadoria manual após a ingestão automática.

## Car

- **Todos os campos**: chassisName, engineSupplier, power, weight
- **Motivo:** a Jolpica não fornece dados técnicos de carro (specs)
- **Ação:** preenchimento manual, entidade por entidade, ao longo do tempo

## Race

- **circuitType** (STREET/PERMANENT)
- **length**
- **laps**
- **Motivo:** o endpoint `/races` não retorna essas informações
- **Ação:** campos tornados opcionais no schema; preenchimento manual posterior

## Driver

- **teamId**
- **Motivo:** o endpoint `/drivers` não inclui vínculo de time — esse vínculo só aparece no endpoint `/results` (ou `/constructors` filtrado por temporada/evento)
- **Ação:** derivar o `teamId` a partir do processamento do endpoint de `results`, não do endpoint de `drivers` isoladamente