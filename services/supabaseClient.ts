import { createClient } from '@supabase/supabase-js';
import { BusinessData } from '../types';

// Validação básica para evitar erro fatal se as envs não existirem
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveLead = async (data: BusinessData) => {
    // TEMPORARIAMENTE DESABILITADO - Aguardando configuração de CORS no EasyPanel
    // Por enquanto, salva no localStorage do navegador

    try {
        const leads = JSON.parse(localStorage.getItem('landbook_leads') || '[]');
        leads.push({
            ...data,
            saved_at: new Date().toISOString()
        });
        localStorage.setItem('landbook_leads', JSON.stringify(leads));
        console.log('✅ Lead salvo localmente no navegador');
    } catch (err) {
        // Silent fail
    }

    // DESCOMENTE O CÓDIGO ABAIXO QUANDO CONFIGURAR CORS NO EASYPANEL:
    // --------------------------------------------------------------------
    // if (!supabaseUrl || !supabaseKey) return;
    //
    // try {
    //   const { error } = await supabase
    //     .from('leads')
    //     .insert([{
    //       user_name: data.userName,
    //       company_name: data.companyName,
    //       email: data.email,
    //       whatsapp: data.whatsapp,
    //       profile: typeof data.profile === 'string' ? data.profile : 'Desconhecido',
    //       answers: data.answers,
    //       created_at: new Date().toISOString()
    //     }]);
    //   if (error) throw error;
    //   console.log('Lead salvo no Supabase!');
    // } catch (err) {
    //   console.error('Erro Supabase:', err);
    // }
};
