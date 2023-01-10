import { InstanceId, InstanceStateName, InstanceType } from 'aws-sdk/clients/ec2'

export interface ServerStatusResponse {
  gameServers: GameServerStatus[]
}
export interface GameServerStatus {
  instanceId: InstanceId
  status: InstanceStateName
  instanceType: InstanceType
  gameName: string
}
