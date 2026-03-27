import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asset } from './asset.entity';

@Entity('asset_classes')
export class AssetClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'CEDEAR', 'Criptomoneda', 'Bono AL30'

  @Column({ nullable: true })
  description: string;

  // One AssetClass (e.g., Criptomoneda) can have Many Assets (Bitcoin, Ethereum)
  @OneToMany(() => Asset, (asset) => asset.assetClass)
  assets: Asset[];
}