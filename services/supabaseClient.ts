import { createClient } from '@supabase/supabase-js';
import { BusinessData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveLead = async (data: BusinessData) => {
    // Debug: verificar se as variáveis estão carregadas
    if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase não configurado');
        console.warn('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Não encontrado');
        console.warn('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurado' : '❌ Não encontrado');
        console.warn('💡 Verifique se as variáveis estão no .env e no Vercel');
        return;
    }

    console.log('🔍 Tentando salvar lead no Supabase...');
    console.log('📊 Dados:', {
        user_name: data.userName,
        company_name: data.companyName,
        email: data.email,
        whatsapp: data.whatsapp,
        profile: typeof data.profile === 'string' ? data.profile : 'Desconhecido'
    });

    try {
        const payload = {
            user_name: data.userName,
            company_name: data.companyName,
            email: data.email,
            whatsapp: data.whatsapp,
            profile: typeof data.profile === 'string' ? data.profile : 'Desconhecido',
            answers: data.answers,
            created_at: new Date().toISOString()
        };

        const { data: insertedData, error } = await supabase
            .from('leads')
            .insert([payload])
            .select();

        if (error) {
            console.error('❌ Erro ao salvar lead:', error);
            console.error('📋 Detalhes do erro:', {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint
            });
            
            // Mensagens específicas para erros comuns
            if (error.code === 'PGRST301' || error.message?.includes('row-level security')) {
                console.error('🔒 Erro RLS: A política de segurança está bloqueando a inserção.');
                console.error('💡 Solução: Execute o SQL do arquivo supabase_fix_401.sql no Supabase SQL Editor');
            } else if (error.code === '23502') {
                console.error('📝 Erro: Algum campo obrigatório está faltando.');
                console.error('💡 Verifique se todos os campos (user_name, company_name, email, whatsapp) estão preenchidos.');
            } else if (error.code === '42501') {
                console.error('🚫 Erro de permissão: Não tem permissão para inserir.');
                console.error('💡 Solução: Verifique as políticas RLS no Supabase.');
            }
        } else {
            console.log('✅ Lead salvo com sucesso no Supabase Cloud!');
            console.log('📝 ID do registro:', insertedData?.[0]?.id);
        }
    } catch (err: any) {
        console.error('❌ Erro inesperado ao salvar lead:', err);
        console.error('📋 Tipo do erro:', err?.constructor?.name);
        console.error('📋 Mensagem:', err?.message);
    }
};
